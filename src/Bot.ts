import "dotenv/config";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import { Listeners } from "./Listeners";
import { Heartbeat } from "./services/Heartbeat";
//import { RansomService } from "./services/RansomService";

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

  //RansomService.start();

  Heartbeat.start();

  console.log("[Bot] Bot is starting...");

  for await (const listener of Listeners) {
    console.log(`[Listener] Registering listener ${listener.name}`);
    // @ts-expect-error
    client.on(listener.name, (...args) => listener.execute(client, ...args));
  }

  await client.login(token);
})();
