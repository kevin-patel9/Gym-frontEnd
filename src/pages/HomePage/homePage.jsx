import { NavbarItem } from '../../hooks/navbar';
import './home.css';
import { useSelector } from "react-redux";
import { UserLogIn } from '../UserLogged/userLogged';
import { OwnerLogIn } from '../OwnerLogged/ownerLogIn';

export const HomePage = () => {

    const auth = useSelector((state) => state.auth);

    return (
        <>
            {!auth.user ? (
                <div className='mainPageContainer'>
                    <h1>GymGoer</h1>
                    <p>Make young India fit</p>
                </div>
            ) :
                (
                    <div style={{ width: "100%", height: "auto" }}>
                        {/* {if owner is logged in} */}
                        {auth.user.isOwner ? (<>
                            <OwnerLogIn />
                        </>) :
                            ( 
                                // {if user is logged in}
                                <>
                                    <UserLogIn />
                                </>
                            )}
                    </div>
                )}
        </>
    )
}