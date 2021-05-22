import './Repository.css';
import reposIcon from '../../icons/repos-not-found.svg'
import ReactPaginate from 'react-paginate';

export default function Repository(props) {
    const PAGE_SIZE = 4;
    let results_navigation = [];
    
    const navigation = (data) => {
        props.setCurrentPage(data.selected);
    }
    for (let i = props.currentPage * PAGE_SIZE; i < (props.currentPage + 1) * PAGE_SIZE; i++) {
            results_navigation.push(i);
    }
    console.log(props.reposInfo);
    return (
        <div className="col-xl-8 col-ms-12 col-lg-7 col-md-6">
            <div className="repository">
                <div className={props.reposInfo[0].length !== 0 ? "repository-content" : "d-none"}>
                    <p className="title">Repositories ({props.userInfo ? props.userInfo.public_repos : ''})</p>
                    {results_navigation.map((index, i) =>
                        <div key={i} className={props.reposInfo[0][index] ? "repositories-wrapper" : "d-none"}>
                            <a href={props.reposInfo[2][index]} className="name">{props.reposInfo[0][index]}</a>
                            <p className="description">{props.reposInfo[1][index]}</p>
                        </div>
                    )}
                    <ReactPaginate
                        pageCount={props.userInfo ? Math.ceil(props.userInfo.public_repos / PAGE_SIZE) : 0}
                        onPageChange={navigation}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        previousLabel={'<'}
                        nextLabel={'>'}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2} />
                </div>
                <div className={props.reposInfo[0].length === 0 ? "repository-not-found" : "d-none"}>
                    <img src={reposIcon} alt="icon" />
                    <p className="text">Repository list is empty</p>
                </div>
            </div>
        </div>
    )
}