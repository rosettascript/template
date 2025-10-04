-- Example: Insert default roles
INSERT INTO roles (name, description, is_system) VALUES
    ('admin', 'System administrator with full access', true),
    ('user', 'Standard user with basic access', true),
    ('moderator', 'Content moderator', true),
    ('guest', 'Guest user with limited access', true);

-- write all the inserts here