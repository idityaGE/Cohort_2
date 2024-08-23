import { useEffect, useState, useRef } from "react";

const Receiver = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("WebSocket connection opened (Receiver)");
      socket.send(JSON.stringify({ type: "identify-as-receiver" }));
    };

    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket closed (Receiver)");

    const newPc = new RTCPeerConnection();
    setPc(newPc);

    newPc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Receiver ICE Candidate: ", event.candidate);
        socket.send(JSON.stringify({ type: "ice-candidate", candidate: event.candidate }));
      }
    };

    newPc.oniceconnectionstatechange = () => {
      if (newPc.iceConnectionState === "connected") {
        console.log("ICE Connection State: Connected (Receiver)");
      }
    };

    socket.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      console.log("Received message on receiver:", msg);
      if (msg.type === "offer") {
        await newPc.setRemoteDescription(msg.offer);
        console.log("Offer set on Receiver");
        const answer = await newPc.createAnswer();
        await newPc.setLocalDescription(answer);
        socket.send(JSON.stringify({ type: "create-answer", answer }));
      } else if (msg.type === "ice-candidate") {
        await newPc.addIceCandidate(msg.candidate);
      }
    };

    newPc.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = new MediaStream([event.track]);
        // videoRef.current.play();
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
    };

    return () => {
      socket.close();
      newPc.close();
    };
  }, []);

  return (
    <div>
      <h1>Receiver</h1>
      <video ref={videoRef} autoPlay></video>
      <button onClick={() => videoRef.current?.play()}>play</button>
    </div>
  );
};

export default Receiver;
