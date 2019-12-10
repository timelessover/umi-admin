import Redirect from 'umi/redirect';

export default (props) => {
    const token = localStorage.getItem('token') || ''


    return (
        <>
            {token ? props.children : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />}
        </>
    );
}