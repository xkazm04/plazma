
import { FormLabel } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { ErrorMessage, InfoMessage, SuccessMessage } from "../Components/Alerts/Alerts";

import DeleteButton from "../Components/Buttons/DeleteButton";
import DisabledButton from "../Components/Buttons/DisabledButton";
import FilledButton from "../Components/Buttons/FilledButton";
import FormButton from "../Components/Buttons/FormButton";
import LinkButton from "../Components/Buttons/LinkButton";
import MenuButton from "../Components/Buttons/MenuButton";
import RegisterButton from "../Components/Buttons/RegisterButton";
import ToggleButton from "../Components/Buttons/ToggleButton";
import Checkbox from "../Components/Forms/Checkbox";
import FormInput from "../Components/Forms/FormInput";
import { NewFormInput } from "../Components/Forms/NewFormInput";
import SelectInput from "../Components/Forms/SelectInput";
import {Input} from "../Components/Forms/Input";
import Title from "../Components/Texts/Title";
import {EmptyReservationIcon, PhoneIcon, MailIcon, HeartIcon, AlertErrorIcon, AlertInfoIcon, AlertSuccessIcon, CloseIcon, ClockIcon, LocationIcon, MoneyIcon, Dots, ProfileIcon, ChangePasswordSvg, ChangeEmailSvg, ChangeBranchSvg} from '../Components/Icons/Icons'
import TitleHuge from "../Components/Texts/TitleHuge";
import TitleDash from "../Components/Texts/TitleDash";
import TitleParagraphText from "../Components/Texts/TitleParagraphText";
import PointText from "../Components/Texts/PointText";
import ParagraphText from "../Components/Texts/ParagraphText";


export default function Components() {
  return (
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <Title title='Buttons'/>
            <FilledButton label='FilledButton' />
            <DeleteButton/>
            <DisabledButton label='DisabledButton' />
            <FormButton label='FormButton' />
            <LinkButton label='LinkButton' />
            <MenuButton label='MenuButton' />
            <RegisterButton label='RegisterButton' />
            <ToggleButton label='ToggleButton' />
        </Grid>
        <Grid item xs={12}>
            <Title title='Alerts'/>
            <ErrorMessage title='ErrorMessage' message='message'/>
            <InfoMessage title='InfoMessage' message='message'/>
            <SuccessMessage title='SuccessMessage' message='message'/>
        </Grid>
        <Grid item xs={12}>
            <Title title='Forms'/>
            <FormInput placeholder='FormInput'/>
            <FormLabel label='FormLabel'/>
            <Checkbox/>
            <Input placeholder='Input'/>
            <NewFormInput placeholder='NewFormInput'/>
            <SelectInput/>
        </Grid>
        <Grid item xs={12}>
            <Title title='Typography'/>
            <TitleHuge title='TitleHuge' />
            <Title title='Title'/>
            <TitleDash title='TitleDash'/>
            <ParagraphText content='ParagraphText'/>
            <PointText content='PointText'/> 
            <TitleParagraphText title='TitleParagraphText'/>
        </Grid>
        <Grid item xs={12}>
            <Title title='Icons'/>
            <PhoneIcon/>
            <MailIcon/>
            <HeartIcon/>
            <AlertSuccessIcon/>
            <AlertErrorIcon/>
            <AlertInfoIcon/>
            <CloseIcon/>
            <ClockIcon/>
            <LocationIcon/>
            <MoneyIcon/>
            <ProfileIcon/>
            <ChangeBranchSvg/>
            <ChangePasswordSvg/>
            <ChangeEmailSvg/>
            <EmptyReservationIcon/>
            <Dots/>
        </Grid>

    </Grid>
  );
}
