import {siteName} from "../components/layout/Layout"
import Head from "next/head"
import IconTab from "../components/icons/IconTab"
import React from "react"
import TabBoard from "../components/boards/TabBoard"
import useSWR from "swr"
import Loader from "../components/loading"
import Error from "./_error"
import {useSession} from "next-auth/client"
import {isEditor} from "../lib/session"

export default function EditorTabs() {
    const [session] = useSession()
    const {data: tabs, error} = useSWR("/api/tabs")
    if (error) {
        return <Error error={error} statusCode={error.status}/>
    } else if (!tabs) {
        return <Loader/>
    }

    return <>
        <Head>
            <title>
                {"All tabs | " + siteName}
            </title>
        </Head>

        <div className={"card bg-2 mb-3"}>
            <div className="card-body">
                <h2 className={"card-title"}>
                    <IconTab/> All tabs
                </h2>
            </div>
        </div>

        <TabBoard tabs={tabs} canEdit={isEditor(session)}/>
    </>
}

export async function getStaticProps() {
    return {
        props: {},
        revalidate: 10
    }
}
