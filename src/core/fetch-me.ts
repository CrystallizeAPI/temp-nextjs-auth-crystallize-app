import { ClientInterface } from "@crystallize/js-api-client"

type Deps = {
    apiClient: ClientInterface;
}

export const fetchMeOn = async (userId: string, tenantId: string, { apiClient }: Deps) => {
    const query = `#graphql
        query {
                user {
                    get(id: "${userId}") {
                        firstName
                        lastName
                        email
                        role(tenantId: "${tenantId}") { 
                            role
                            roleName
                        }
                    }
                }
            }
    `
    const me = await apiClient.pimApi(query);
    return me.user.get
}
