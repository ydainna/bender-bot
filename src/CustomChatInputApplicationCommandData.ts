import { ChatInputApplicationCommandData } from "discord.js";

export default interface CustomChatInputApplicationCommandData extends ChatInputApplicationCommandData {
  ephemeral: boolean;
}
