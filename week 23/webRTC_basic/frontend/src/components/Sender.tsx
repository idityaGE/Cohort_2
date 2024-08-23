import { useEffect, useState, useRef } from "react";

const Sender = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("WebSocket connection opened (Sender)");
      setSocket(newSocket);
      newSocket.send(JSON.stringify({ type: "identify-as-sender" }));
    };

    newSocket.onerror = (error) => console.error("WebSocket error:", error);
    newSocket.onclose = () => console.log("WebSocket closed (Sender)");

    return () => {
      newSocket.close();
      pc?.close();
    };
  }, []);

  const initiateConnection = async () => {
    if (!socket) {
      alert("Socket not connected");
      return;
    }

    const newPc = new RTCPeerConnection();
    setPc(newPc);

    newPc.onnegotiationneeded = async () => {
      const offer = await newPc.createOffer();
      await newPc.setLocalDescription(offer);
      socket.send(JSON.stringify({ type: "create-offer", offer }));
    }

    newPc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sender ICE Candidate: ", event.candidate);
        socket.send(JSON.stringify({ type: "ice-candidate", candidate: event.candidate }));
      }
    };

    newPc.oniceconnectionstatechange = () => {
      if (newPc.iceConnectionState === "connected") {
        console.log("ICE Connection State: Connected (Sender)");
      }
    };

    socket.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      console.log("Received message on sender:", msg);
      if (msg.type === "answer") {
        await newPc.setRemoteDescription(msg.answer);
        console.log("Answer set on Sender");
      } else if (msg.type === "ice-candidate") {
        await newPc.addIceCandidate(msg.candidate);
        console.log("ICE Candidate added to Sender");
      }
    };

    getStream(newPc);
  };

  const getStream = async (pc: RTCPeerConnection) => {
    try {
      // const display = await navigator.mediaDevices.getDisplayMedia({ video: true }); // for screen sharing
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
      videoRef.current!.srcObject = stream;
      console.log("Stream added to Peer Connection on Sender");
    } catch (error) {
      console.error("Failed to get media stream:", error);
    }
  };

  return (
    <div>
      <h1>Sender</h1>
      <video ref={videoRef} autoPlay></video>
      <button onClick={initiateConnection}>Initiate Connection</button>
    </div>
  );
};

export default Sender;
