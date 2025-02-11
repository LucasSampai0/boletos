import Image from "next/image"
import RandomImage from "@/app/login/utils/randomImage";
import { LoginForm } from "@/components/login-form";

export default function Page() {
    return (
        <main className="h-screen flex justify-center items-center">
            <RandomImage imagePaths={["/images/bg1.jpg", "/images/bg2.jpg", "/images/bg3.jpg", "/images/bg4.jpg"]}></RandomImage>
            <div className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-10">
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-sm">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </main>
    );
}