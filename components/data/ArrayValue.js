import Link from "next/link"
import DataBadge from "./DataBadge"

export default function ArrayValue({data, column, onChange = null}) {
    if (onChange === null) {
        return data.map(v => <Link href={"/column/" + column.urlId + "?v=" + v} key={v}>
            <a className={"me-2"} title={"View column " + column.name + " with value " + v}>
                <DataBadge name={v}/>
            </a>
        </Link>)
    }

    return column.values.map(v => <a className={"me-2"} key={v} onClick={() => {
        if (data.includes(v)) {
            onChange(data.filter(d => d !== v))
        } else {
            onChange(data.concat([v]))
        }
    }}>
        <DataBadge data={data.includes(v) ? true : null} name={v}/>
    </a>)
}
