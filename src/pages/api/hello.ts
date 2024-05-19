// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.OPENAI_URL,
  apiKey: process.env.OPENAI_KEY,
});


type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  

  // 小浣熊翻车点1 ：生成基于 OpenAI 包的调用代码。
  const completion = await openai.chat.completions.create({
    model:"openai/gpt-4o",
    messages:[
      {
        role: "user",
        content: [
          { type: "text", text: "What's in this image?" },
          {
            type: "image_url",
            image_url:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
          },
        ],
      },
    ]
  })
  console.log(completion.choices[0].message.content)
  res.status(200).json({ name: "John Doe" });
}
