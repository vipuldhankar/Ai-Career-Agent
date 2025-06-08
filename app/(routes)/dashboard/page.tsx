"use client"
import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import AitoolsList from './_components/AitoolsList'
import History from './_components/History'
import UserSubscriptionStatus from './_components/UserSubscriptionStatus '
import BackButton from './_components/BackButton'

function Dashboard() {
    return (
        <div>
            <BackButton />
            <UserSubscriptionStatus />
            <WelcomeBanner />
            <AitoolsList />
            <History />
        </div>


    )
}

export default Dashboard