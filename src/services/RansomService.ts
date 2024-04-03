import { CronJob } from "cron";
import { getLogger } from "../utils/getLogger";
import { EmbedBuilder } from "discord.js";
import { client } from "../Bot";

export namespace RansomService {
  export async function start() {
    const log = getLogger("RansomService");
    log.info("Starting RansomService...");

    CronJob.from({
      cronTime: "30 1 * * *",
      onTick: function () {
        ransom();
        const log = getLogger("RansomService");
        log.info("RansomService has been executed !");
      },
      start: true,
      timeZone: "Europe/Paris",
    });
  }

  async function ransom() {
    const tetherAdress: string = "";
    const usdcAdress: string = "";
    const ltcAdress: string = "";

    const someMoney: string = "1000 €";

    const userIDToSendMessage: string = "";

    const acknowledgementOfReceiptUserID = "";

    const embed: EmbedBuilder = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("Vous devez de l'argent à quelqu'un !")
      .addFields(
        {
          name: `Vous devez ${someMoney} à quelqu'un`,
          value: "",
        },
        {
          name: `Liens pour le payement`,
          value: `**Tether** : ${tetherAdress}\n**USDC** : ${usdcAdress}\n**LTC** : ${ltcAdress}`,
        }
      )
      .setThumbnail("https://cdn-icons-png.flaticon.com/128/3879/3879040.png")
      .setTimestamp()
      .setFooter({
        text: "Une dette ce doit d'être rembourser...",
        iconURL: client.user?.avatarURL() || undefined,
      });

    if (!client.users.cache.has(userIDToSendMessage)) {
      const log = getLogger("RansomService");
      log.error("User not found.. (userID)");
      return;
    }

    if (!client.users.cache.has(acknowledgementOfReceiptUserID)) {
      const log = getLogger("RansomService");
      log.error("User not found.. (acknowledgementOfReceiptUserID)");
      return;
    }

    client.users.send(userIDToSendMessage, { embeds: [embed] });
    client.users.send(acknowledgementOfReceiptUserID, "RansomService has been executed !");
  }
}
