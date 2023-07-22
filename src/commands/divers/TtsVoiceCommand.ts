import { CommandInteraction, Client, ApplicationCommandType, GuildMember, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../Command";
import { createAudioResource, joinVoiceChannel, createAudioPlayer } from "@discordjs/voice";
import { getAudioUrl } from "google-tts-api";
import { setError } from "../../utils/setError";

export const TtsVoiceCommand: Command = {
  name: "ttsvoice",
  description: "convert text to voice",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "tts",
      description: "Add your text for tts",
    },
  ],
  ephemeral: true,

  run: async (client: Client, interaction: CommandInteraction) => {
    const tts = interaction.options.get("tts")?.value;
    const channel = interaction.member instanceof GuildMember ? interaction.member.voice.channel : null;

    if (!channel) {
      setError("You must be in a voice channel to use this command.", interaction);
      return;
    }

    const audioUrl = getAudioUrl(tts as string, {
      lang: "fr",
      slow: false,
      host: "https://translate.google.com",
    });

    let voiceConnection = joinVoiceChannel({ channelId: channel.id, guildId: channel.guild.id, adapterCreator: channel.guild.voiceAdapterCreator });

    const ressource = createAudioResource(audioUrl);
    const player = createAudioPlayer();

    voiceConnection.subscribe(player);
    player.play(ressource);

    await interaction.followUp("Vous avez envoyé le message suivant :\n " + tts + "\n\n dans le channel :\n" + channel.name);
  },
};
