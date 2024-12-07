const axios = require('axios');
const inquirer = require('inquirer');

async function tiktokdata() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'sessionid',
      message: '[+] enter sessionid from tiktok acc -> ',
    },
    {
      type: 'input',
      name: 'target',
      message: '[+] enter target -> ',
    },
  ]);
  return answers;
}

function generateuseragents() {
  const useragents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
  ];
  const randomIndex = Math.floor(Math.random() * useragents.length);
  return useragents[randomIndex];
}

async function claim(sessionid, usertarget) {
  const url = 'https://api16-normal-c-alisg.tiktokv.com/passport/login_name/update/?residence=SA&device_id=6870709334024848901&os_version=13.6.1&app_id=1233&iid=6924902298624624385&app_name=musical_ly';

  const headers = {
    'Host': 'api16-normal-c-alisg.tiktokv.com',
    'User-Agent': generateuseragents(),
    'Content-Type': 'application/x-www-form-urlencoded',
    'sdk-version': '2',
    'passport-sdk-version': '5.12.1',
  };
  const data = new URLSearchParams();
  data.append('login_name', usertarget);
  const cookies = { 
    sessionid: sessionid,
  };
  try {
    const response = await axios.post(url, data.toString(), { headers, cookies });
    if (response.data.message === "success") {
      console.log("done swap by -> github.com/infallibless");
      console.log("enjoy your life")
      process.exit();
    } else if (response.data.message === "error") {
      console.log("waiting ...");
    } else {
      console.log("err session id");
      process.exit();
    }
  } catch (error) {
    console.error(error.message, error);
    process.exit();
  }
}

async function main() {
  const { sessionid, usertarget } = await tiktokdata();
  console.log(">>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<");
  claim(sessionid, usertarget);
}
main();
