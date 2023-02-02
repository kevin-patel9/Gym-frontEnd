import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './userLog.css'
import ReactPaginate from 'react-paginate';

export const UserLogIn = () => {
    const [userDetail, setUserDetail] = useState("");
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

        axios.get("http://localhost:9000/scan")
            .then((res) => setAfterScan(res.data))

        if (afterScan !== undefined) {
            setUser(afterScan?.slice(0, afterScan.length))
        }
    }, [afterScan.length])

    const pageCount = Math.ceil(user.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }


    return (
        <div className='userDetailContain'>
            <div className='userContain'>
                <div className='userUniqueCode'>
                    <img className='userImg' src={userDetail.img} />
                    <h6>{userDetail.username}</h6>
                    <img className='qrCodeImg' src={userDetail.qrCode} />
                    <h6>User Code</h6>
                    <h4>{userDetail.userCode}</h4>
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