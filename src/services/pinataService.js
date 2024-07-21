import {get, post} from 'axios';
const FormData = require('form-data');
import fs from 'fs';

/*
* example
 */
async function pinFileToIPFS() {
    try {
        const text = "Hello World!";
        const blob = new Blob([text], { type: "text/plain" });
        const file = new File([blob], "hello-world.txt")
        const data = new FormData();
        data.append("file", file);

        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${JWT}`,
            },
            body: data,
        });
        const resData = await res.json();
        console.log(resData);
    } catch (error) {
        console.log(error);
    }
};
async function pinJSONToIPFS() {
    try {
        const data = JSON.stringify({
            pinataContent: {
                name: "Pinnie",
                description: "A really sweet NFT of Pinnie the Pinata",
                image: "ipfs://bafkreih5aznjvttude6c3wbvqeebb6rlx5wkbzyppv7garjiubll2ceym4",
                external_url: "https://pinata.cloud"
            },
            pinataMetadata: {
                name: "metadata.json"
            }
        })
        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JWT}`,
            },
            body: data,
        });
        const resData = await res.json();
        console.log(resData);
    } catch (error) {
        console.log(error);
    }
};

async function uploadToPinata(imageUrl, title) {
    try {
        // 이미지를 가져옵니다.
        const imageResponse = await get(imageUrl, {responseType: 'arraybuffer'});
        const imageBytes = imageResponse.data;

        // FormData 객체를 생성하고 이미지를 추가합니다.
        const formData = new FormData();
        formData.append('file', imageBytes, {filename: title});
        formData.append('title', title);

        // 핀란드 API에 이미지를 업로드합니다.
        const response = await post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            formData,
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    'Authorization': `Bearer ${pinataJwt}`,
                    ...formData.getHeaders(),
                }
            }
        );

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        throw error;
    }
}

