import { CommandInteraction, Client, EmbedBuilder, ApplicationCommandType } from "discord.js";
import { Command } from "../../Command";
import { getRandomInt } from "../../utils/getRandomInt";

export const BibleCommand: Command = {
  name: "bible",
  description: "Random verse from the bible",
  type: ApplicationCommandType.ChatInput,
  ephemeral: false,

  run: async (client: Client, interaction: CommandInteraction) => {
    const randomBook: number = getRandomInt(1, 66);

    const getBible: Response = await fetch(`https://api.getbible.net/v2/ls1910/${randomBook}/chapters.json`);
    const bibleData: any = await getBible.json();

    const randomChapter: number = getRandomInt(1, Object.keys(bibleData).length);

    //chapter
    const getChapter: Response = await fetch(`https://api.getbible.net/v2/ls1910/${randomBook}/${randomChapter}.json`);
    const chapterData: any = await getChapter.json();

    const randomVerse = chapterData.verses.length;
    const randomVerseNbr: number = getRandomInt(1, randomVerse);

    const { name, book_name, chapter, translation } = chapterData;
    const textVers = chapterData.verses[randomVerseNbr].text;

    if (textVers === undefined) {
      console.log(`- name : ${name} \n- book_name : ${book_name} \n- chapter : ${chapter} \n- randomVerse : ${randomVerse}`);
      return;
    }

    const embed: EmbedBuilder = new EmbedBuilder()
      .setColor("#FF6A00")
      .setTitle(translation)
      .addFields({
        name: `${name} (${book_name} - ${chapter}:${randomVerse})`,
        value: `${chapterData.verses[randomVerseNbr].text}`,
      })
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/2600/2600768.png")
      .setTimestamp()
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
