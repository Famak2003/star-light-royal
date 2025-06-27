"use client";

import store, { persistor } from '@/lib/store';
import { ConfigProvider } from 'antd';
// import { store } from '@/lib/store';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

export const StoreProvider = ({children}: {children: React.ReactNode}) => {
    const image  = "./Assets/bike.jpg"
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Toaster position={'top-right'} />
                <ConfigProvider
                    theme={{
                    token: {
                        colorPrimary: "#4F46E5",
                        borderRadius: 6,
                        // colorBorder: "#4F46E5"
                        colorInfoBorderHover: "#595959"
                    },
                    components: {
                        Button: {
                            colorPrimary: "#003366",
                        },
                        Input: {
                            hoverBorderColor: "#003366",
                            activeBorderColor: "#4F46E5",
                            lineHeight: 2
                        }
                    },
                    }}
                >
                    <div
                        className=' overflow-hidden w-screen h-full'
                    >
                        {children}                
                    </div>
                </ConfigProvider>
            </PersistGate>
        </Provider>
    )
}