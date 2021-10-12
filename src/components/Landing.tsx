import { Login } from "components/Login"
import { MainNav } from "components/MainNav"
import { GetCurrentUser } from "graphql/queries/GetCurrentUser"
import { QueryError } from "./QueryError"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { User } from "models/User"

export const Landing = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)

  const { loading, error } = useQuery(GetCurrentUser, {
    onCompleted: ({ currentUser }) => {
      setUser(currentUser)
    },
  })

  if (loading) return <p>loading...</p>
  if (error) return <QueryError error={error} />

  return (
    <div className="text-center">
      {user ? (
        <MainNav user={user} />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  )
}