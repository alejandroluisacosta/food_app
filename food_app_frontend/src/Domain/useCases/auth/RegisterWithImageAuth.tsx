import { ImagePickerAsset } from "expo-image-picker";
import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepositories";
import { User } from "../../entities/User";
import * as ImagePicker from 'expo-image-picker';

const { registerWithImage } = new AuthRepositoryImpl();

export const RegisterWithImageAuthUseCase = async (user: User, file: ImagePicker.ImagePickerAsset) => {
    return await registerWithImage(user, file);
}