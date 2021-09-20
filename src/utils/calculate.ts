import {UserConfiguration} from "../interfaces/UserConfiguration";

/**
 * Add some number to the property *toPut*, if is not present initialize to 0;
 */
function addToPut(userConf: UserConfiguration, toPut: number) {
  if (!userConf.toPut) { userConf.toPut = 0; }

  userConf.toPut += toPut;
}

/**
 * Main function. The core of the app.
 * Passed the users configrations, this resolve the temporary total in the toPut property
 */
export default function calculate(usersConfiguration: UserConfiguration[]) {
  const newUserConf: UserConfiguration[] = [...usersConfiguration];
  newUserConf.map((userConf) => {
    userConf.toPut = 0;
    return userConf;
  });
  let total = usersConfiguration.reduce((acc, curr) => acc += curr.alreadyPutted, 0) + 0.7;

  while (total > 1) {
    const average = total / newUserConf.length;
    for (const key in newUserConf) {
      const userConfCopy = {...newUserConf[key]};

      if (userConfCopy.maxToPut && userConfCopy.toPut! >= userConfCopy.maxToPut) {
        continue;
      }

      if (userConfCopy.maxToPut) {
        const diffBetweenAvgAndMax = (userConfCopy.toPut! + average) - userConfCopy.maxToPut;

        if (userConfCopy.maxToPut < average) {
          addToPut(userConfCopy, userConfCopy.maxToPut);
          total -= userConfCopy.maxToPut;
        } else if (diffBetweenAvgAndMax > 0) {
          addToPut(userConfCopy, userConfCopy.maxToPut - userConfCopy.toPut!);
          total -= (userConfCopy.maxToPut - userConfCopy.toPut!);
        } else {
          addToPut(userConfCopy, average);
          total -= average;
        }
      } else {
        addToPut(userConfCopy, average);
        total -= average;
      }

      newUserConf[key] = userConfCopy;
    }
  }

  for (const key in newUserConf) {
    newUserConf[key].toPut = Math.round(newUserConf[key].toPut!);
  }

  return newUserConf;
}
