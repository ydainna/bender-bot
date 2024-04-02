import "dotenv/config";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import { Listeners } from "./Listeners";
import { getLogger } from "./utils/getLogger";
import { Logger } from "tslog";
import { RansomService } from "./services/RansomService";

export const client: Client<boolean> = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ],
  partials: [Partials.Channel],
});

(async () => {
  const token: string = process.env.BOT_TOKEN as string;

  RansomService.start();

  const log: Logger<unknown> = getLogger("Bot");
  log.info("Bot is starting...");

  for await (const listener of Listeners) {
    const log: Logger<unknown> = getLogger("Listener");
    log.info(`Registering listener ${listener.name}`);
    // @ts-expect-error
    client.on(listener.name, (...args) => listener.execute(client, ...args));
  }

  await client.login(token);
})();
