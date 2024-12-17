import OpenAI from 'openai';
import { config } from '../config/env';
import type { TravelDetails, ChecklistItem } from '../types';
import { SYSTEM_PROMPT } from './prompts';  // 确保正确导入
import i18next from 'i18next';  // 引入 i18next

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
  dangerouslyAllowBrowser: true
});

export async function generateAIChecklist(details: TravelDetails): Promise<ChecklistItem[]> {
  try {
    // 获取当前语言
    const currentLanguage = i18next.language;
    //
    // // 根据当前语言动态生成 SYSTEM_PROMPT
    // const systemPrompt = currentLanguage === 'en' ?
    //     `You are a professional travel planner, proficient in packing for various travel scenarios. Based on the detailed trip information provided by the user, generate an intelligent and personalized packing list.` :
    //     `你是一个专业的旅行规划专家，精通各种旅行场景的行李规划。请根据用户提供的详细行程信息，生成一个智能且个性化的行李清单。`;

    const prompt = currentLanguage === 'en' ?
        `Please generate a detailed packing list for a ${details.days}-day trip to ${details.destination}.
Consider the following factors:
1. Weather and local characteristics
2. Duration and clothing requirements
3. Essential and emergency items
4. Local cultural customs
5. Possible activity needs` :
        `请为我生成一个去${details.destination}旅行${details.days}天的详细行李清单。
请考虑以下因素：
1. 目的地的天气和当地特点
2. 旅行天数和换洗需求
3. 必需品和紧急物品
4. 当地文化习俗
5. 可能的活动需求`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('API 返回内容为空');
    }

    const result = JSON.parse(content);
    if (!Array.isArray(result.items)) {
      throw new Error('API 返回格式不正确');
    }

    return result.items;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('生成行李清单时出错，请稍后重试');
  }
}
