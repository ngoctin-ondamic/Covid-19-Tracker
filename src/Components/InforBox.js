import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

function InforBox({ title, cases, total }) {
    return (
        <div className="inforBox">
            <Card>
                <CardContent>
                    {/**Check futher infors about Typography on React Documentation */}
                    <Typography className="inforBox_title" color="textSecondary">
                        {/** Title */}
                        {title}
                    </Typography>
                    <h2>{cases}</h2>
                    {/** Numbers of Cases */}
                    <Typography>
                        {total} Total
                    </Typography>
                    {/** Total */}
                </CardContent>
            </Card>
        </div>
    )
}

export default InforBox
