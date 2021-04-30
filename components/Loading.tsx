import ReactLoading from 'react-loading'
import * as React from 'react'

function Loading(): JSX.Element {
    return (
        <div className="loading">
            <ReactLoading type={'spin'} color={'#0073ff'} />
        </div>
    )
}

export default Loading
