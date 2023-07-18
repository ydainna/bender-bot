import { CommandInteraction, Client } from "discord.js";
import CustomChatInputApplicationCommandData from "./CustomChatInputApplicationCommandData";

export interface Command extends CustomChatInputApplicationCommandData {
  run: (client: Client, interaction: CommandInteraction) => void;
}
