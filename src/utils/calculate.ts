import {UserConfiguration} from "../interfaces/UserConfiguration";

export default function calculate(usersConfiguration: UserConfiguration[]) {
  const total = usersConfiguration.reduce((acc, curr) => acc += curr.alreadyPutted, 0);
  const average = total / usersConfiguration.length;
  const newUserConf: UserConfiguration[] = [];

  for (const userConf of usersConfiguration) {
    const userConfCopy = {...userConf};

    userConfCopy.toPut = userConfCopy.maxToPut ? userConfCopy.maxToPut : average - userConfCopy.alreadyPutted;
    newUserConf.push(userConfCopy);
  }

  return newUserConf;
}
