import { Command } from "./Command";
//divers
import { EightBallCommand } from "./commands/divers/EightBallCommand";
import { HowToCommand } from "./commands/divers/HowToCommand";
import { DiceCommand } from "./commands/divers/DiceCommand";
import { UserInformationCommand } from "./commands/divers/UserInformationCommand";
import { InfoCommand } from "./commands/divers/InfoCommand";

export const Commands: Command[] = [EightBallCommand, HowToCommand, DiceCommand, InfoCommand, UserInformationCommand];
