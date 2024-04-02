import { Command } from "./Command";
//divers
import { EightBallCommand } from "./commands/fun/EightBallCommand";
import { HowToCommand } from "./commands/fun/HowToCommand";
import { DiceCommand } from "./commands/games/DiceCommand";
import { UserInformationCommand } from "./commands/informations/UserInformationCommand";
import { InfoCommand } from "./commands/informations/InfoCommand";
import { TtsVoiceCommand } from "./commands/divers/TtsVoiceCommand";
import { BibleCommand } from "./commands/divers/BibleCommand";
import { PrivateMessageCommand } from "./commands/divers/PrivateMessageCommand";

export const Commands: Command[] = [
  TtsVoiceCommand,
  EightBallCommand,
  HowToCommand,
  DiceCommand,
  InfoCommand,
  UserInformationCommand,
  BibleCommand,
  PrivateMessageCommand,
];
