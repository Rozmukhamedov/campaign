import React from "react"
import {Skeleton as MantineSkeleton} from "@mantine/core"
import "./style.css";

const Skeleton = () => {

    const skeletonLength = Array(7).fill("")
    return (
        <div className="skeleton_wrapper">
            <div className="skeleton_header">
                <MantineSkeleton height={7} mr={10} width="20%" radius="md"/>
                <MantineSkeleton height={7} width="80%" radius="md"/>
            </div>
            <div className="skeleton_body">
                <MantineSkeleton height={37} mt={6} ml={12} circle width="20%" radius="md"/>
                <MantineSkeleton height={20} mt={6} width="60%" radius="md"/>
                <MantineSkeleton height={20} mt={6} width="15%" radius="md"/>
            </div>
            <div className="skeleton_header">
                <MantineSkeleton height={7} mr={10} width="20%" radius="md"/>
                <MantineSkeleton height={7} width="80%" radius="md"/>
            </div>
            <div className="skeleton_body">
                <MantineSkeleton height={37} mt={6} ml={12} circle width="20%" radius="md"/>
                <MantineSkeleton height={20} mt={6} width="60%" radius="md"/>
                <MantineSkeleton height={20} mt={6} width="15%" radius="md"/>
            </div>
            <div className="skeleton_header">
                <MantineSkeleton height={7} mr={10} width="20%" radius="md"/>
                <MantineSkeleton height={7} width="80%" radius="md"/>
            </div>
            <div className="skeleton_body">
                <MantineSkeleton height={37} mt={6} ml={12} circle width="20%" radius="md"/>
                <MantineSkeleton height={20} mt={6} width="60%" radius="md"/>
                <MantineSkeleton height={20} mt={6} width="15%" radius="md"/>
            </div>
            <div className="skeleton_header">
                <MantineSkeleton height={7} mr={10} width="20%" radius="md"/>
                <MantineSkeleton height={7} width="80%" radius="md"/>
            </div>
        </div>
    )
}

export default Skeleton;