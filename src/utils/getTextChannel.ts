import { CommandInteraction, Client, TextChannel, Channel } from "discord.js";
import { error } from "./error";

export async function getTextChannelForInteraction(client: Client, interaction: CommandInteraction): Promise<TextChannel | null> {
  const channel: Channel | null = await client.channels.fetch(interaction.channelId);
  if (channel === null) {
    error("La channel n'a pas été trouver ou n'existe pas", interaction);
    return null;
  }
  if (!(channel instanceof TextChannel)) {
    error("Cette commande s'utilise que dans les salons de type Text", interaction);
    return null;
  }
  return channel as TextChannel;
}
