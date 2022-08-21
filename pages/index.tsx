import React from 'react';
import HomePage from "../components/HomePage";
import MainLayout from "../layout/MainLayout";
import {NextPage} from "next";
import {fetchAndHydrateEvents} from "../utils/geInitPageEvents";

const Index: NextPage = () => {

    return <MainLayout marginLeft={0}>
        <HomePage/>
    </MainLayout>
}




Index.getInitialProps = fetchAndHydrateEvents

export default Index