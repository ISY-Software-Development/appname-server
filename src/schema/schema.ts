import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import UserType from './types/UserType';
import userData from '../MOCK_DATA.json';

const rootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return userData;
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                userData.push({
                    id: userData.length + 1,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                });

                return args;
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
});

export default schema;
