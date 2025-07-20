import React from 'react'

function UserInfo({ register }) {
    return (
        <div>
            <>
                <input {...register('name')} placeholder="Name"  />
                <input {...register('email')} placeholder="Name"  />
            </>
        </div>
    )
}

export default UserInfo