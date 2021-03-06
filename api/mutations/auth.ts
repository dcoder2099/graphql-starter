/**
 * Authentication API endpoints (signIn, signOut).
 *
 * @see https://firebase.google.com/docs/auth/admin/manage-cookies
 * @copyright 2016-present Kriasoft (https://git.io/Jt7GM)
 */

import type { User } from "db";
import { GraphQLFieldConfig, GraphQLObjectType, GraphQLString } from "graphql";
import { Context } from "../context";
import db from "../db";
import { UserType } from "../types";

interface SignInArgs {
  idToken?: string;
  email?: string;
  password?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signIn: GraphQLFieldConfig<unknown, Context, any> = {
  description: "Authenticates user with an ID token or email and password.",

  type: new GraphQLObjectType({
    name: "SignInPayload",
    fields: {
      me: { type: UserType },
    },
  }),

  args: {
    idToken: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },

  async resolve(self, args: SignInArgs, ctx) {
    // TODO:
    //   Authenticate user with the provided Firebase ID token,
    //   or username / email and password.

    const user = await db.table<User>("user").where({ id: "wp60xu" }).first();
    const me = await ctx.signIn(user);

    return { me };
  },
};

export const signOut: GraphQLFieldConfig<unknown, Context> = {
  description: "Removes the authentication cookie.",
  type: GraphQLString,

  resolve(self, args, ctx) {
    ctx.signOut();
  },
};
