import {UserConfiguration} from "../interfaces/UserConfiguration";

export default function calculate(usersConfiguration: UserConfiguration[]) {
  const total = usersConfiguration.reduce((acc, curr) => {
    const maxToPut = curr.maxToPut !== null ? curr.maxToPut : 0;
    return acc += (curr.alreadyPutted - maxToPut)
  }, 0);
  const userWithoutMaximport = usersConfiguration.reduce(
    (acc, curr) => curr.maxToPut !== null ? acc : acc += 1, 0
  );
  const average = total / userWithoutMaximport;
  const newUserConf: UserConfiguration[] = [];

  for (const userConf of usersConfiguration) {
    const userConfCopy = {...userConf};

    userConfCopy.toPut = userConfCopy.maxToPut ? userConfCopy.maxToPut - userConfCopy.alreadyPutted : average - userConfCopy.alreadyPutted;
    newUserConf.push(userConfCopy);
  }

  return newUserConf;
}
