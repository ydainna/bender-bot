//Client(bot)
import { readyListener } from "./listeners/readyListener";
//Command
import { interactionCreateListener } from "./listeners/interactionCreateListener";
//Guild member
import { guildMemberAddListener } from "./listeners/guildMemberAddListener";
import { guildMemberRemoveListener } from "./listeners/guildMemberRemoveListener";
//Message
import { messageCreate } from "./listeners/messageCreate";

export const Listeners = [readyListener, interactionCreateListener, guildMemberAddListener, guildMemberRemoveListener, messageCreate];
