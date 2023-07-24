import { CommandInteraction, Client, ApplicationCommandType, GuildMember, ApplicationCommandOptionType, VoiceBasedChannel } from "discord.js";
import { Command } from "../../Command";
import { createAudioResource, joinVoiceChannel, createAudioPlayer, VoiceConnection, AudioResource, AudioPlayer } from "@discordjs/voice";
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
    {
      type: ApplicationCommandOptionType.String,
      required: false,
      name: "lang",
      description: "Language for tts (accents)",
    },
    {
      type: ApplicationCommandOptionType.Boolean,
      required: false,
      name: "slow",
      description: "Slow mode for tts",
    },
  ],
  ephemeral: true,

  run: async (client: Client, interaction: CommandInteraction) => {
    const tts: string | number | boolean | undefined = interaction.options.get("tts")?.value;
    const lang: string | number | boolean | undefined = interaction.options.get("lang")?.value;
    const slow: string | number | boolean | undefined = interaction.options.get("slow")?.value;
    const channel: VoiceBasedChannel | null = interaction.member instanceof GuildMember ? interaction.member.voice.channel : null;

    if (!channel) {
      setError("You must be in a voice channel to use this command.", interaction);
      return;
    }

    const audioUrl: string = getAudioUrl(tts as string, {
      lang: (lang as string) ? (lang as string) : "fr-FR",
      slow: (slow as boolean) ? (slow as boolean) : false,
      host: "https://translate.google.com",
    });

    let voiceConnection: VoiceConnection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const ressource: AudioResource<null> = createAudioResource(audioUrl);
    const player: AudioPlayer = createAudioPlayer();

    voiceConnection.subscribe(player);
    player.play(ressource);

    await interaction.followUp("Vous avez envoyé le message suivant :\n " + tts + "\n\n dans le channel :\n" + channel.name);
  },
};
