import {UserConfiguration} from "./UserConfiguration";

export interface ConfigFormProps {
  initialValues?: UserConfiguration;
  sendLabel: string;
  submitCallback: (event: UserConfiguration) => any;
}
