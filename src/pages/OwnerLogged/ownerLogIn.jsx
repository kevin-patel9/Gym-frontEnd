import './ownerLog.css'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import ReactPaginate from 'react-paginate';


export const OwnerLogIn = () => {

    const [userDetail, setUserDetail] = useState("");
    const [codeInput, setCodeInput] = useState([]);
    const [userCode, setUserCode] = useState("");
    const [afterScan, setAfterScan] = useState([]);
    const [user, setUser] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 4;
    const pageVisited = pageNumber * usersPerPage;

    const displayUsers = user &&
        user
            .slice(pageVisited, pageVisited + usersPerPage)
            .map((data, i) => {
                return (
                    <div key={i} className='ownerScanned'>
                        <span>{data.username}</span>
                        <span>{data.date.slice(0, 22)}</span>
                    </div>
                )
            })

    const auth = useSelector(state => state.auth)
    const id = auth.user._id;

    useEffect(() => {
        axios.get(`http://localhost:9000/user/${id}`)
            .then((res) => setUserDetail(res.data))

        axios.get(`http://localhost:9000/user?userCode=${userCode.toUpperCase()}`)
            .then((res) => setCodeInput(res.data))

        if (codeInput.length !== 0) {
            axios.post(`http://localhost:9000/scan`, {
                name: codeInput && codeInput[0].name,
                username: codeInput && codeInput[0].username,
                date: new Date().toUTCString()
            })
        }

        axios.get("http://localhost:9000/scan")
            .then((res) => setAfterScan(res.data))

        if (afterScan !== undefined) {
            setUser(afterScan?.slice(0, 40))
        }

    }, [userCode, codeInput.length, afterScan.length])

    const userCodeInput = useRef(null);

    const onSearch = () => {
        setUserCode(userCodeInput.current.value)
        userCodeInput.current.value = "";
    }

    const pageCount = Math.ceil(user.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    return (
        <div className='ownerDetailContain'>
            <div className='ownerContain'>
                <div className='ownerUniqueCode'>
                    <img className='ownerImg' src={userDetail.img} alt="User Profile" />
                    <h5>{userDetail.username}</h5>
                    <img className='qrCodeImg' src={userDetail.qrCode} alt="Qr Scanner" />
                    <h6>User Code</h6>
                    <div>
                        <input className='ownerInput' type="text" ref={userCodeInput}
                            maxLength="6" placeholder='Type Code Here' required />
                        <button className='btns' onClick={onSearch}>Search</button>
                    </div>

                </div>
            </div>
            <div className='entryLogContain'>
                <h6>Entry Log</h6>
                <div className='ownerScanContain'>
                    {displayUsers}
                </div>
                <div className='paginationContain'>
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBtn"}
                        previousLinkClassName={"previousBtn"}
                        nextLinkClassName={"nextBtn"}
                        disabledLinkClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            </div>
        </div>
    )
}