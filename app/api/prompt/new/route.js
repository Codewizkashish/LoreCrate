import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})

    } catch (error) {
        console.error("API ERROR:", error);
        return new Response(JSON.stringify({ message: "Failed to create prompt", error: error.message }), { status: 500 });
    }

}