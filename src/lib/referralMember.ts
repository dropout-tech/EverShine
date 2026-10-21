/** Stable identity wins; a legacy name must match exactly one member. */
export function findReferralMember<T extends { id?: unknown; name?: unknown }>(
    members: T[], id: unknown, name: unknown
): T | undefined {
    if (id !== null && id !== undefined && id !== '') {
        return members.find((member) => String(member.id) === String(id));
    }
    const matches = members.filter((member) => member.name === name);
    return matches.length === 1 ? matches[0] : undefined;
}
