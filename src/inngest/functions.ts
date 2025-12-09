import prisma from "@/lib/database";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();

export const executeAi = inngest.createFunction(
    { id: "execute-ai" },
    { event: "execute/ai" },
    async ({ event, step }) => {
        const { steps: geminiSteps } = await step.ai.wrap(
            "gemini-generate-text",
            generateText,
            {
                model: google("gemini-2.5-flash"),
                system: "You are a helpful assistant.",
                prompt: "What is 7/7/7/7?",
            }
        );

        const { steps: openaiSteps } = await step.ai.wrap(
            "openai-generate-text",
            generateText,
            {
                model: openai("gpt-4o-mini"),
                system: "You are a helpful assistant.",
                prompt: "What is 7/7/7/7?",
            }
        );

        return {
            geminiSteps,
            openaiSteps,
        }
    }
);