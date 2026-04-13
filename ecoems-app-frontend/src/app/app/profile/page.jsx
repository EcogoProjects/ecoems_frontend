import NavBarDesktop from "@/components/NavBarDesktop";
import NavBarMovile from "@/components/NavBarMovile";
import Image from "next/image";

function ProfilePage() {
    const image_url = "/assets/ecogo_avatar_04.png";
    const username = "Nombre de Usuario";
    const email = "ejemplo@gmail.com"
    const phone_number = "+1234567890";
    return ( 
        <div className="flex flex-col min-h-screen justify-center items-center">
            <NavBarDesktop/>
            <div className="bg-base p-4 rounded-[18px] flex items-center gap-5">
                <div className="rounded-full overflow-hidden border-3 border-base-dark">
                    <Image 
                    src={image_url} 
                    alt="Profile Icon" 
                    width={100} 
                    height={100}/>
                </div>
                <div className="flex flex-col items-start h-full">
                    <p className="text-lg font-black">{username}</p>
                    <p>{email}</p>
                    <p>{phone_number}</p>
                </div>
            </div>
            <NavBarMovile/>
        </div>
     );
}

export default ProfilePage
;