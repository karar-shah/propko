import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  const listingData = (await request.json()) as IListingData;
  const prompt = createPrompt(listingData);
  const gptDescription = await getGptDescription(prompt);

  try {
    return NextResponse.json({
      succeed: true,
      data: gptDescription,
      code: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      succeed: false,
      code: "UNKOWN_ERROR",
    });
  }
}

function createPrompt(data: IListingData) {
  // Remove the dbRef property
  const { dbRef, ...dataWithoutDbRef } = data;
  const instructions = `Your job is to create a property description for an airbnb listing based on the details provided in tripple quotes below.
  Description Guidelines:
  1. Keep the description under 100 words.
  2. Highlight the unique features of the property.
  3. Emphasize the convenience and comfort for potential guests.
  4. Use engaging language to create a welcoming atmosphere.

  Now, generate a captivating property description.

  property detail: """${JSON.stringify(dataWithoutDbRef)}"""`;

  return instructions;
}

async function getGptDescription(prompt: string) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const response =
      chatCompletion.choices[0].message.content || "Null Response";

    return response;
  } catch (error) {
    console.error("Error during GPT processing:", error);
    return 'API KEY INVALID'
  }
}
