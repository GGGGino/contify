import {UserConfiguration} from "./UserConfiguration";

export interface ConfigFormProps {
  sendLabel: string;
  submitCallback: (event: UserConfiguration) => any;
}
