import './Header.css';
import logo from '../../icons/logo.svg';
import iconSearch from '../../icons/search-icon.svg';

export default function Header(props) {
    const url = 'https://api.github.com/search/users?q=';
    // let searchInput = document.querySelector('.input-search');
    
    const onFocus = (e) => {
        let searchInput = e.target;
        searchInput.addEventListener('keydown', async (e) => {
            if (e.keyCode === 13 && searchInput.value !== '') {
                props.setLoader(true);
                props.setUserInfo(null);
                fetch(url + searchInput.value).then((response) => {
                    return response.json();
                }).then((data) => {
                    if (data.total_count !== 0 && data.items) {
                        let user = data.items[0].url;
                        fetch(user).then((response) => {
                            return response.json();
                        }).then((userInfo) => {
                            // console.log(Math.ceil(userInfo.public_repos / 30));
                            if (userInfo.public_repos !== 0) {
                                for (let i = 0; i < Math.ceil(userInfo.public_repos / 30); i++) {
                                    fetch(userInfo.repos_url + `?page={i}`).then((response) => {
                                        return response.json();
                                    }).then((reposInfo) => {
                                        console.log(reposInfo);
                                        let repos = [[], [], []];
                                        for (let i = 0; i < reposInfo.length; i++) {
                                            repos[0].push(reposInfo[i].name);
                                            repos[1].push(reposInfo[i].description);
                                            repos[2].push(reposInfo[i].html_url)
                                        }
                                        props.setUserInfo(userInfo);
                                        props.setReposInfo(repos);
                                        props.setSearchResult(true);
                                        props.setLoader(false);
                                    })
                                }

                            }

                        })
                        // props.setLoader(false);
                    }
                    else {
                        props.setUserInfo(null);
                        props.setSearchResult(false);
                        props.setSearchNotFound(true);
                        props.setLoader(false);
                    }

                })

            }
            else if (e.keyCode === 13 && searchInput.value === '') {
                props.setSearchResult(false);
                props.setUserInfo(null);
                props.setSearchNotFound(false);
                props.setLoader(false);
            }
        })
    };
    return (
        <div className="header">
            <div className="header-content">
                <img src={logo} alt="logo" className="logo" />
                <div className="input-search-container">
                    <img src={iconSearch} alt="search" className="icon-search" />
                    <input value={props.searchUsername} onFocus={onFocus} className="input-search" type="text" placeholder="Enter GitHub username" name="username" />
                </div>
            </div>
        </div>
    )
}