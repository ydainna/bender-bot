import { CommandInteraction, Client, TextChannel } from "discord.js";
import { setError } from "./setError";

export async function getTextChannelForInteraction(client: Client, interaction: CommandInteraction): Promise<TextChannel | null> {
  const channel = await client.channels.fetch(interaction.channelId);
  if (channel === null) {
    setError("La channel n'a pas été trouver ou n'existe pas", interaction);
    return null;
  }
  if (!(channel instanceof TextChannel)) {
    setError("Cette commande s'utilise que dans les salons de type Text", interaction);
    return null;
  }
  return channel as TextChannel;
}
