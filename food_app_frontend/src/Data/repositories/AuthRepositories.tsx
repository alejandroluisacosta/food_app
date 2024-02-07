import { AxiosError } from "axios";
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { ImagePickerAsset } from "expo-image-picker";
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';

export class AuthRepositoryImpl implements AuthRepository {

    async register(user: User): Promise<ResponseApiDelivery> {
        try {

            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/create', user);
            console.log('RESPONSE REPOSITORY: ' + JSON.stringify(response.data));
            return Promise.resolve(response.data);
            
            
        } catch (error) {
            let e = (error as AxiosError);
            console.log('Error: ' +  JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
            
        }
    }
    
    async registerWithImage(user: User, file: ImagePickerAsset): Promise<ResponseApiDelivery> {
        try {

            let data = new FormData();
            data.append('image', {
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            } as any
            );

            data.append('user', JSON.stringify(user));


            const response = await ApiDeliveryForImage.post<ResponseApiDelivery>('/users/registerWithImage', data);
            return Promise.resolve(response.data);
            
            
        } catch (error) {
            let e = (error as AxiosError);
            console.log('Error: ' +  JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
            
        }
    }

    async login(email: string, password: string): Promise<ResponseApiDelivery> {

        try {

            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/login', {
                email: email,
                password
            });
            console.log('RESPONSE REPOSITORY: ' + JSON.stringify(response.data));
            return Promise.resolve(response.data);
            
            
        } catch (error) {
            let e = (error as AxiosError);
            console.log('Error: ' +  JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
            
        }

    }

}