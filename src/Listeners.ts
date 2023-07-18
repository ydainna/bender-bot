//Client(bot)
import { readyListener } from "./listeners/readyListener";
//Command
import { interactionCreateListener } from "./listeners/interactionCreateListener";
//Guild member
import { guildMemberAddListener } from "./listeners/guildMemberAddListener";
import { guildMemberRemoveListener } from "./listeners/guildMemberRemoveListener";
//Message
import { messageDeleteListener } from "./listeners/messageDeleteListener";
import { messageUpdateListener } from "./listeners/messageUpdateListener";

export const Listeners = [
  readyListener,
  interactionCreateListener,
  guildMemberAddListener,
  guildMemberRemoveListener,
  messageDeleteListener,
  messageUpdateListener,
];
